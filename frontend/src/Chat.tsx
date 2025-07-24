import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export function Chat() {
  const [input, setInput] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);
  const [pergunta, setPergunta] = useState('');

  const enviarPergunta = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setPergunta(input);
    try {
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: input }),
      });

      const data = await res.json();
      setResposta(data.resposta);
    } catch (error) {
      setResposta('Erro ao conectar com o servidor.');
    }
    setLoading(false);
    setInput('');
  };

  return (
    <Paper
        sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#110c11ff',
        p: 3,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        color: '#9b00ff', // roxo neon
        fontFamily: 'monospace',
        borderRadius: 0,
        boxShadow: 'none',
    }}
    >
        <Typography
            variant="h2"
            sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 'bold',
            color: '#9b00ff',
            }}
        >
        SIM / NÃO CHAT
        </Typography>

        <Box
            sx={{
            flex: 1,
            bgcolor: '#110c11ff', // preto com roxo escuro
            borderRadius: 2,
            p: 3,
            pt: 2,
            pr: 0.5,
            pl: 0.5,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            }}
        >
            {pergunta && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end', }}>
                <Box
                sx={{
                    bgcolor: '#23033aff', // roxo escuro
                    border: '1px solid #9b00ff',
                    color: '#ffffffff',
                    px: 4,
                    py: 2,
                    borderRadius: '25px',
                    fontFamily: 'monospace',
                    fontSize: '1.4rem',
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                }}
                >
                {pergunta}
                </Box>
                <Avatar
                sx={{
                    border: '1px solid #9b00ff',
                    bgcolor: 'transparent',
                    color: '#9b00ff',
                    width: 50,
                    height: 50,
                }}
                >
                Eu
                </Avatar>
            </Box>
            )}

            {resposta && (
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                justifyContent: 'flex-start',
                }}
            >
                <Avatar
                sx={{
                    border: '1px solid #9b00ff',
                    bgcolor: 'transparent',
                    color: '#9b00ff',
                    width: 50,
                    height: 50,
                }}
                >
                AI
                </Avatar>
                <Box
                sx={{
                    bgcolor: '#52089cff', // roxo médio
                    border: '1px solid #9b00ff',
                    color: '#ffffffff',
                    px: 4,
                    py: 2,
                    borderRadius: '25px',
                    fontFamily: 'monospace',
                    fontSize: '1.4rem',
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                }}
                >
                {resposta.toUpperCase()}
                </Box>
            </Box>
            )}
        </Box>

        <Box
            sx={{
                position: 'relative',
                mt: 3,
                width: '100%',
                maxWidth: 1000,
                mx: 'auto',
            }}
        >
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Faça uma pergunta"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                autoComplete="off"
                spellCheck={false}
                sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    bgcolor: '#1a001a',
                    pr: 6,
                    py: 1,
                    color: '#ffffffff',
                    '& fieldset': { borderColor: '#9b00ff' },
                    '&:hover fieldset': { borderColor: '#9b00ff' },
                    '&.Mui-focused fieldset': { borderColor: '#9b00ff' },
                },
                input: {
                    fontFamily: 'monospace',
                    color: '#ffffffff',
                    paddingLeft: 4,
                    fontSize: '1.3rem',
                },
                }}
                onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) {
                    e.preventDefault();
                    enviarPergunta();
                }
                }}
            />

            <Button
                onClick={enviarPergunta}
                disabled={loading}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    minWidth: 0,
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#1a001a',
                    border: '1px solid #9b00ff',
                    color: '#9b00ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                    backgroundColor: '#2a002a',
                    },
                }}
            >
                <ArrowUpwardIcon fontSize="small" />
            </Button>
        </Box>
    </Paper>
  );
}