import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom/extend-expect';

test('displays question prompts after fetching', async () => {
  render(<App />);

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
  render(<App />);

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
  render(<App />);

  // Add a question first
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is React?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A library' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A framework' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A language' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  const questionText = await screen.findByText(/What is React\?/i);
  const deleteButtons = screen.getAllByText(/Delete Question/i);
  
  // Click the first delete button (assumed linked to first question)
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(screen.queryByText(/What is React\?/i)).toBeNull();
  });
});

test('updates the answer when the dropdown is changed', async () => {
  render(<App />);

  // Add a question first
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is JavaScript?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A programming language' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A coffee' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A book' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  const questionText = await screen.findByText(/What is JavaScript\?/i);
  const dropdowns = screen.getAllByLabelText(/Correct Answer/i);
  
  // Change the first dropdown (assumed linked to first question)
  fireEvent.change(dropdowns[0], { target: { value: '2' } });

  await waitFor(() => {
    expect(dropdowns[0].value).toBe('2');
  });
});
