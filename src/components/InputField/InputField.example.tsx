import React, { useState } from 'react';
import InputField from './InputField';

const InputFieldExample: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  
  return (
    <div style={{ maxWidth: '400px', padding: '20px' }}>
      <h1>InputField Component Examples</h1>
      
      <h2>Basic Variants</h2>
      <InputField 
        label="Outlined Input (Default)" 
        placeholder="Type something..." 
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        helperText="This is the default outlined variant"
        clearable
      />
      
      <InputField 
        label="Filled Input" 
        placeholder="Type something..." 
        variant="filled"
        helperText="This is the filled variant"
      />
      
      <InputField 
        label="Ghost Input" 
        placeholder="Type something..." 
        variant="ghost"
        helperText="This is the ghost variant"
      />
      
      <h2>Sizes</h2>
      <InputField 
        label="Small Input" 
        placeholder="Small size..." 
        size="sm"
      />
      
      <InputField 
        label="Medium Input (Default)" 
        placeholder="Medium size..." 
        size="md"
      />
      
      <InputField 
        label="Large Input" 
        placeholder="Large size..." 
        size="lg"
      />
      
      <h2>States</h2>
      <InputField 
        label="Disabled Input" 
        placeholder="Cannot edit this..." 
        disabled
        helperText="This input is disabled"
      />
      
      <InputField 
        label="Invalid Input" 
        placeholder="Email address" 
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        invalid={!emailValue.includes('@') && emailValue.length > 0}
        errorMessage="Please enter a valid email address"
      />
      
      <InputField 
        label="Loading Input" 
        value="Loading data..."
        loading
        helperText="This input is in loading state"
      />
      
      <h2>Special Features</h2>
      <InputField 
        label="Password Input" 
        type="password"
        placeholder="Enter your password" 
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        helperText="Click the eye icon to toggle visibility"
      />
      
      <InputField 
        label="Clearable Input" 
        placeholder="Type to see clear button..." 
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        clearable
        helperText="Clear button appears when you type"
      />
      
      <InputField 
        label="Required Field" 
        placeholder="This field is required" 
        required
        helperText="This shows the required indicator"
      />
    </div>
  );
};

export default InputFieldExample;
