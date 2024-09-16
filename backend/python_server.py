import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print(f"Received message from Electron: {message}")
        response = f"Hello from Python, you sent: {message}"
        await websocket.send(response)

# 启动 WebSocket 服务器，监听本地的 8765 端口
async def main():
    async with websockets.serve(echo, "localhost", 8765):
        print("WebSocket server running on ws://localhost:8765")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
