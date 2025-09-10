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
        var _a, _b, _c, _d;
        try {
            const body = yield req.json();
            const { email, password } = body;
            // Call your backend login API
            const backendResponse = yield axios_1.default.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, // Replace with your backend login API
            { email, password });
            return server_1.NextResponse.json({
                status: 200,
                success: true,
                message: "Login successful",
                data: backendResponse.data,
            });
        }
        catch (error) {
            console.error("Error in login:", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            return server_1.NextResponse.json({
                success: false,
                message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) ||
                    "Invalid credentials or server error",
            }, { status: ((_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.status) || 500 });
        }
    });
}
exports.POST = POST;
//# sourceMappingURL=route.js.map