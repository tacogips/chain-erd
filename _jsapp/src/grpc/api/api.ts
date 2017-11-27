import { grpc, Code, Metadata } from "grpc-web-client";

declare var __GRPC_SERVER_HOST__: string;
declare var __GRPC_SERVER_PORT__: number;
declare var __GRPC_USE_TLS__: boolean;

export interface grpcConnectInfo {
    serverHost: string
    serverPort: number
    useTLS: boolean
    url: string
}

function url(serverHost: string, serverPort: number, useTLS: boolean): string {
	const protocol = useTLS ? "https://": "http://"
	return `${protocol}${serverHost}:${serverPort}`
}

export const grpcConnection: grpcConnectInfo = {
    serverHost: __GRPC_SERVER_HOST__,
    serverPort: __GRPC_SERVER_PORT__,
    useTLS: __GRPC_USE_TLS__,
    url: url(__GRPC_SERVER_HOST__,__GRPC_SERVER_PORT__,__GRPC_USE_TLS__),
}


