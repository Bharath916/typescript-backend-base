"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const axios_1 = __importDefault(require("axios"));
const server_1 = require("next/server");
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield req.json();
            // const { email, password } = body;
            // Simulate saving to database
            // console.log("Received Registration Data:", email, password);
            // You can connect to DB here and store user
            // Call your backend server with IP or domain
            const backendResponse = yield axios_1.default.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create`, // Change to your server domain/IP
            body);
            return server_1.NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 });
        }
        catch (error) {
            console.error("Error in registration:", error);
            return server_1.NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
        }
    });
}
exports.POST = POST;
//# sourceMappingURL=route.js.map