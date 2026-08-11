import { spawn } from 'node:child_process'

const proc = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], {
  stdio: 'inherit',
  shell: true,
})

proc.on('close', (code) => process.exit(code ?? 0))
