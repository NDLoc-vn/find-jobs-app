import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "../app/user/login/page";

// Test suite for the Login component
describe("Login Component", () => {
  it("renders the login form correctly", () => {
    render(<Login />);

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
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText("Mật khẩu");
    const toggleButton = screen.getByRole("button", { name: "Show password" });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("allows user to enter email and password", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Mật khẩu");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    expect(emailInput).toHaveValue("test@test.com");

    fireEvent.change(passwordInput, { target: { value: "mypassword" } });
    expect(passwordInput).toHaveValue("mypassword");
  });

  it("handles login errors correctly", () => {
    // ch co
  });

});
