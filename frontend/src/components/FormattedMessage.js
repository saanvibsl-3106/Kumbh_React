import React from 'react';

const FormattedMessage = ({ text }) => {
    // Function to format the text with proper line breaks and structure
    const formatText = (text) => {
        // Split by double newlines to create paragraphs
        const paragraphs = text.split('\n\n');
        
        return paragraphs.map((paragraph, index) => {
            // Handle bullet points and lists
            if (paragraph.includes('*') || paragraph.includes('-')) {
                const lines = paragraph.split('\n');
                const formatted = lines.map((line, lineIndex) => {
                    // Handle bullet points
                    if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
                        return (
                            <li key={lineIndex} style={{ marginBottom: '4px' }}>
                                {line.replace(/^[\s]*[\*\-][\s]*/, '')}
                            </li>
                        );
                    }
                    // Handle bold text (wrapped in **)
                    else if (line.includes('**')) {
                        const parts = line.split('**');
                        return (
                            <div key={lineIndex} style={{ marginBottom: '8px', fontWeight: '600' }}>
                                {parts.map((part, partIndex) => 
                                    partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                                )}
                            </div>
                        );
                    }
                    else if (line.trim()) {
                        return (
                            <div key={lineIndex} style={{ marginBottom: '4px' }}>
                                {line}
                            </div>
                        );
                    }
                    return null;
                });
                
                return (
                    <div key={index} style={{ marginBottom: '12px' }}>
                        <ul style={{ 
                            marginLeft: '16px', 
                            paddingLeft: '0', 
                            listStyle: 'disc',
                            marginBottom: '8px'
                        }}>
                            {formatted}
                        </ul>
                    </div>
                );
            }
            
            // Handle section headers (lines that end with :)
            else if (paragraph.includes(':') && paragraph.split('\n')[0].endsWith(':')) {
                const lines = paragraph.split('\n');
                const header = lines[0];
                const content = lines.slice(1).join('\n');
                
                return (
                    <div key={index} style={{ marginBottom: '16px' }}>
                        <div style={{ 
                            fontWeight: '600', 
                            color: '#333',
                            marginBottom: '8px',
                            fontSize: '15px'
                        }}>
                            {header}
                        </div>
                        {content && (
                            <div style={{ paddingLeft: '8px' }}>
                                {content.split('\n').map((line, lineIndex) => 
                                    line.trim() && (
                                        <div key={lineIndex} style={{ marginBottom: '4px' }}>
                                            {line}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                );
            }
            
            // Regular paragraphs
            else {
                return (
                    <p key={index} style={{ 
                        marginBottom: '12px', 
                        lineHeight: '1.6',
                        color: '#444'
                    }}>
                        {paragraph}
                    </p>
                );
            }
        });
    };

    return (
        <div style={{ fontSize: '15px', lineHeight: '1.6' }}>
            {formatText(text)}
        </div>
    );
};

export default FormattedMessage;
