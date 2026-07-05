import { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils.js';

const TabsContext = createContext();

function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [tabValue, setTabValue] = useState(defaultValue || value);
  const currentValue = value !== undefined ? value : tabValue;

  const handleChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setTabValue(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ className, value, children, ...props }) {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isActive = selectedValue === value;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        isActive
          ? 'bg-background text-foreground shadow-xs'
          : 'hover:bg-background/50 hover:text-foreground',
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ className, value, children, ...props }) {
  const { value: selectedValue } = useContext(TabsContext);

  if (selectedValue !== value) return null;

  return (
    <div
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };