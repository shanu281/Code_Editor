import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import all necessary modes and themes
import "ace-builds/src-min-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-sass';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-handlebars';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-coffee';
import 'ace-builds/src-noconflict/mode-css';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-twilight';

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('html');
    const [theme, setTheme] = useState('github');

    const handleRun = () => {
        console.log('Running code:', code);
        setOutput(code);
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

    const modes = ["javascript", "java", "python", "xml", "ruby", "sass", "markdown", "mysql", "json", "html", "handlebars", "golang", "csharp", "coffee", "css"];
    const themes = ["github", "monokai", "solarized_dark", "twilight"];

    return (
        <Container>
            <Row className="mb-3">
                <Col md={6} sm={12}>
                    <Form.Group controlId="modeSelect">
                        <Form.Label>Select Mode</Form.Label>
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
                        <Form.Label>Select Theme</Form.Label>
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
                        onChange={handleChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        value={code}
                        width="100%"
                        height="500px"
                        enableBasicAutocompletion={true}
                        enableLiveAutocompletion={true}
                        enableSnippets={true}
                    />
                </Col>
                <Col md={6} sm={12} className="problem-sec">
                    <p>Solution output will be displayed here.</p>
                    <iframe
                        title="Output"
                        srcDoc={output}
                        style={{ width: '100%', height: '500px', border: '1px solid #ddd' }}
                    />
                </Col>
            </Row>
            <Row className="mb-3 justify-content-center">
                <Col className="text-center">
                    <Button style={{ width: "6rem" }} variant="primary" onClick={handleRun}>
                        Run
                    </Button>
                    <Button style={{ width: "6rem" }} variant="success" onClick={handleSubmit} className="ml-2">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CodeEditor;
