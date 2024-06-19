import React, { useState, useRef } from 'react';
import '../App.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import AceEditor from 'react-ace';
import { Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-twilight';

const CodeEditor = () => {
    const editorRef = useRef(null);
    const [code, setCode] = useState('');
    const [mode, setMode] = useState('javascript');
    const [theme, setTheme] = useState('github');
    const toast = useToast();
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        if (!editorRef.current) return;
        const sourceCode = editorRef.current.editor.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(mode, sourceCode);
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "An error occurred.",
                description: error.message || "Unable to run code",
                status: "error",
                duration: 6000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        console.log('Submitting code:', code);
        // Add code submission logic here
    };

    const handleChange = (newValue) => {
        setCode(newValue);
    };

    const handleModeChange = (e) => {
        setMode(e.target.value);
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    const modes = ["javascript", "typescript", "python", "java", "csharp", "php"];
    const themes = ["github", "monokai", "solarized_dark", "twilight"];

    return (
        <Container>
            <Row className="mb-3">
                <Col md={6} sm={12}>
                    <Form.Group controlId="modeSelect">
                        <Form.Label><b>Select Language</b></Form.Label>
                        <Form.Select aria-label="Select Mode" value={mode} onChange={handleModeChange}>
                            {modes.map((mode) => (
                                <option key={mode} value={mode}>
                                    {mode}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                    <Form.Group controlId="themeSelect">
                        <Form.Label><b>Select Theme</b></Form.Label>
                        <Form.Select aria-label="Select Theme" value={theme} onChange={handleThemeChange}>
                            {themes.map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6} sm={12} className="problem-sec">
                    <AceEditor
                        mode={mode}
                        theme={theme}
                        name="code-editor"
                        editorProps={{ $blockScrolling: true }}
                        ref={editorRef}
                        height="100%"
                        width="100%"
                        onChange={handleChange}
                        enableBasicAutocompletion={true}
                        enableLiveAutocompletion={true}
                        enableSnippets={true}
                    />
                </Col>
                <Col md={6} sm={12} className="problem-sec">
                    <h2>Output</h2>
                    {output
                        ? output.map((line, i) => <Text key={i}>{line}</Text>)
                        : 'Click "Run" to see the output here'}
                </Col>
            </Row>
            <Row className="mb-3 justify-content-center">
                <Col className="text-center">
                    <Button className='run-btn' onClick={runCode} isLoading={isLoading}>
                        Run
                    </Button>
                    <Button className='submit-btn' onClick={handleSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CodeEditor;

