export const containerStyles = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '24px',
  border: '1px solid #e1e5e9',
  borderRadius: '8px',
  backgroundColor: '#ffffff'
};

export const formStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '16px',
  
  input: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },
  
  button: {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#2563eb'
    },
    '&:disabled': {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    }
  }
};