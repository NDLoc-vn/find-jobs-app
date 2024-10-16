import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "../app/user/login/page";
import { AuthProvider } from "@/app/contexts/auth-context";
import { useRouter } from "next/navigation";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      // replace: jest.fn(),
      // back: jest.fn(),
      // forward: jest.fn(),
    });
  })
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  })
  it("renders the login form correctly", () => {
    render(<AuthProvider><Login /></AuthProvider>);

    expect(screen.getByRole('heading', { level: 1, name: "Đăng nhập" })).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mật khẩu")).toBeInTheDocument();

    expect(screen.getByText("Đăng nhập bằng Google")).toBeInTheDocument();
    expect(screen.getByText("Quên mật khẩu")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Đăng nhập" })).toBeInTheDocument();
    expect(screen.getByText("Chưa có tài khoản?")).toBeInTheDocument();
    expect(screen.getByText("Nhà tuyển dụng")).toBeInTheDocument();
  });

  it("toggles password visibility when the eye icon is clicked", () => {
    render(<AuthProvider><Login /></AuthProvider>);

    const passwordInput = screen.getByPlaceholderText("Mật khẩu");
    const toggleButton = screen.getByRole("button", { name: "Show password" });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("allows user to enter email and password", () => {
    render(<AuthProvider><Login /></AuthProvider>);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Mật khẩu");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    expect(emailInput).toHaveValue("test@test.com");

    fireEvent.change(passwordInput, { target: { value: "mypassword" } });
    expect(passwordInput).toHaveValue("mypassword");
  });

  it("handles login errors correctly", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 401,
      },
    });

    render(<AuthProvider><Login /></AuthProvider>);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mật khẩu"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));

    // const errorMessage = await screen.findByText(/sai tài khoản hoặc mật khẩu/i);
    const errorMessage = await screen.findByText(/Đăng nhập thất bại/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("handles login successfully", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'fakeToken',
        user: 'fakeUser',
      },
      status: 200,
    });

    render(<AuthProvider><Login /></AuthProvider>);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mật khẩu"), {
      target: { value: "rightpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));

    await waitFor(() => {
      expect(screen.queryByText(/Đăng nhập thất bại/i)).not.toBeInTheDocument();
    });

    // expect(useRouter().push).toHaveBeenCalledWith('/');
  });
});