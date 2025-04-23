import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom';


beforeEach(() => {
  render(<App />);
});

test('displays question prompts after fetching', async () => {
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is React?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A library' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A framework' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A language' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => {
    expect(screen.getByText(/What is React\?/i)).toBeInTheDocument();
  });
});

test('creates a new question when the form is submitted', async () => {
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is JavaScript?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A programming language' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A coffee' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A book' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => {
    expect(screen.getByText(/What is JavaScript\?/i)).toBeInTheDocument();
  });
});

test('deletes the question when the delete button is clicked', async () => {
  // Add a question first
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is React?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A library' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A framework' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A language' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  const questionItem = await screen.findByText(/What is React\?/i);
  const container = questionItem.closest('li') || questionItem.closest('div');
  const deleteButton = within(container).getByText(/Delete Question/i);
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText(/What is React\?/i)).toBeNull();
  });
});

test('updates the answer when the dropdown is changed', async () => {
  // Add a question first
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is JavaScript?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A programming language' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A coffee' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A book' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  const questionItem = await screen.findByText(/What is JavaScript\?/i);
  const container = questionItem.closest('li') || questionItem.closest('div');
  const dropdown = within(container).getByLabelText(/Correct Answer/i);
  fireEvent.change(dropdown, { target: { value: '2' } });

  await waitFor(() => {
    expect(dropdown.value).toBe('2');
  });
});
