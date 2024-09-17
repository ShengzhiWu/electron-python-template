import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print(f"Received message from Electron: {message}")
        response = f"Hello from Python, you sent: {message}"
        await websocket.send(response)

# Start the WebSocket server, listening on the local port 8765
async def main():
    async with websockets.serve(echo, "localhost", 8765):
        print("WebSocket server running on ws://localhost:8765")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
