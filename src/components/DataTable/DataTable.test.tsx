import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './DataTable';

interface TestData {
  id: number;
  name: string;
  age: number;
  status: string;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', age: 30, status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 25, status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', age: 40, status: 'Active' },
];

const testColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestData, sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' as keyof TestData, sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status' as keyof TestData },
];

describe('DataTable', () => {
  test('renders table with correct data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    // Check if headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check if data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    render(<DataTable data={[]} columns={testColumns} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays empty state', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('sorts data when clicking on sortable column header', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    // Get the age header
    const ageHeader = screen.getByText('Age');
    
    // First click should sort ascending
    fireEvent.click(ageHeader);
    const cells = screen.getAllByRole('row');
    
    // First data row should be Jane (25) after sorting by age
    expect(cells[1]).toHaveTextContent('Jane Smith');
    
    // Second click should sort descending
    fireEvent.click(ageHeader);
    const cellsAfterSecondClick = screen.getAllByRole('row');
    
    // First data row should be Bob (40) after sorting by age descending
    expect(cellsAfterSecondClick[1]).toHaveTextContent('Bob Johnson');
  });

  test('handles row selection', () => {
    const mockOnRowSelect = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true} 
        onRowSelect={mockOnRowSelect} 
      />
    );
    
    // Find all checkboxes (one for select all, and one for each row)
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(testData.length + 1);
    
    // Select the first row
    fireEvent.click(checkboxes[1]);
    expect(mockOnRowSelect).toHaveBeenCalledWith([testData[0]]);
    
    // Select another row
    fireEvent.click(checkboxes[2]);
    expect(mockOnRowSelect).toHaveBeenCalledWith([testData[0], testData[1]]);
    
    // Deselect the first row
    fireEvent.click(checkboxes[1]);
    expect(mockOnRowSelect).toHaveBeenCalledWith([testData[1]]);
  });

  test('select all functionality works', () => {
    const mockOnRowSelect = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true} 
        onRowSelect={mockOnRowSelect} 
      />
    );
    
    // Find the select all checkbox
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    
    // Select all rows
    fireEvent.click(selectAllCheckbox);
    expect(mockOnRowSelect).toHaveBeenCalledWith(testData);
    
    // Deselect all rows
    fireEvent.click(selectAllCheckbox);
    expect(mockOnRowSelect).toHaveBeenCalledWith([]);
  });
});
