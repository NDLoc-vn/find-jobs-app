import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SearchBar from '../app/ui/SearchBar'

describe('Page', () => {
  it('renders the search bar inputs and button', () => {
    render(<SearchBar />)

    const jobTitleInput = screen.getByPlaceholderText("Chức dnh, kĩ năng, ...");
    expect(jobTitleInput).toBeInTheDocument();

    const locationInput = screen.getByPlaceholderText("Vị trí");
    expect(locationInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /Tìm kiếm/i });
    expect(searchButton).toBeInTheDocument();
  })
})