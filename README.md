# Uzence Frontend Components

A React component library featuring high-quality, reusable UI components built with TypeScript and TailwindCSS.

## Technical Stack

- React
- TypeScript
- TailwindCSS
- Storybook

## Components

This library currently includes two main components:

### 1. InputField

A flexible and customizable input component with various validation states and appearance options.

**Features:**
- Text input with label, placeholder, helper text, and error message
- Multiple states: disabled, invalid, loading
- Multiple variants: filled, outlined, ghost
- Size options: small, medium, large
- Optional features: clear button, password toggle
- Theme support: light & dark

### 2. DataTable

A powerful data table component for displaying and interacting with tabular data.

**Features:**
- Display tabular data with customizable columns
- Column sorting functionality
- Single and multiple row selection
- Loading state handling
- Empty state display

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/uzence-frontend.git
   cd uzence-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory if needed:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

### Development

To start the development server:

```
npm start
```

### Running Storybook

To launch Storybook for component development and documentation:

```
npm run storybook
```

This will start Storybook at [http://localhost:6006](http://localhost:6006).

### Testing

To run tests:

```
npm test
```

## Usage Examples

### InputField

```tsx
import { InputField } from './components/InputField';

function MyForm() {
  return (
    <InputField
      label="Email Address"
      placeholder="Enter your email"
      helperText="We'll never share your email with anyone else"
      variant="outlined"
      size="md"
    />
  );
}
```

### DataTable

```tsx
import { DataTable } from './components/DataTable';

function UserList() {
  const columns = [
    { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
  ];
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];
  
  return (
    <DataTable
      data={data}
      columns={columns}
      selectable={true}
      onRowSelect={(rows) => console.log('Selected rows:', rows)}
    />
  );
}
```

## Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.test.tsx
│   │   ├── InputField.stories.tsx
│   │   └── index.ts
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.test.tsx
│   │   ├── DataTable.stories.tsx
│   │   └── index.ts
├── styles/        # Global styles and TailwindCSS configuration
├── utils/         # Utility functions
└── App.tsx        # Demo application
```

