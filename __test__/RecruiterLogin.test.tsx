import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import RecruiterLogin from "../app/recruiter/login/page";

describe("RecruiterLogin Component", () => {
  it("renders the recruiter login form correctly", () => {
    render(<RecruiterLogin />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mật khẩu")).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Đăng nhập/i })).toBeInTheDocument();
  });

  it("allows typing in the email and password input fields", () => {
    render(<RecruiterLogin />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Mật khẩu");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "myPassword" } });

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("myPassword");
  });

  it("toggles password visibility when the eye icon button is clicked", () => {
    render(<RecruiterLogin />);

    const passwordInput = screen.getByPlaceholderText("Mật khẩu");
    const toggleButton = screen.getByRole('button', { name: /Toggle Password Visibility/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("displays error message when email or password is missing", () => {
    render(<RecruiterLogin />);

    const submitButton = screen.getByRole('button', { name: /Đăng nhập/i });

    fireEvent.click(submitButton);

    expect(screen.getByText("Vui lòng điền đầy đủ thông tin")).toBeInTheDocument();
  });

  it("displays success message on successful submission", async () => {
    render(<RecruiterLogin />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Mật khẩu");
    const submitButton = screen.getByRole('button', { name: /Đăng nhập/i });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "myPassword" } });

    fireEvent.click(submitButton);

    expect(await screen.findByText("Đăng nhập thành công")).toBeInTheDocument();
  });
});
