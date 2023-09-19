# React-Native-Toastbox

A toast notification system for React Native applications. This system supports different types of toasts (`info`, `error`, and `success`) and has built-in animations to enhance user experience.


![demo](https://github.com/Slaverdure06/React-Native-Toastbox/assets/42808459/2c1c9d49-adfe-4d53-b9a1-556d516bc1b5)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Wrap your App with ToastProvider](#wrap-your-app-with-toastprovider)
  - [Use the useToast hook](#use-the-usetoast-hook)
- [API](#api)
  - [Toast Customization](#toast-customization)
- [Contributing](#contributing)
- [License](#license)

## Installation

//To do

## Usage

### Wrap your App with `ToastProvider`

To get started, you must wrap your application (or the part of your application where you want to display toasts) with the `ToastProvider`.

```tsx
import { ToastProvider } from 'react-native-toastbox';

function App() {
  return (
    <ToastProvider>
      {/* rest of your app */}
    </ToastProvider>
  );
}
```

### Use the useToast hook

Wherever you want to display a toast, use the `useToast` hook.

```tsx
import { useToast } from './path-to-your-toast-files';

function MyComponent() {
  const { showToast, hideToast } = useToast();

  const handleClick = () => {
    showToast({
      id: 'unique-id',
      text1: 'This is a toast!',
    });
  };

  return <Button onClick={handleClick}>Show Toast</Button>;
}
```

## API

### Toast Customization

Modifiable attributes of a toast.

```tsx
type Toast = {
  id: string;
  type?: 'info' | 'error' | 'success';
  text1: string;
  text2?: string;
  autoHide?: boolean;
  visibilityTime?: number;
  animationConfig?: {
    duration?: number;
    tension?: number;
    friction?: number;
  };
};

```

## Contributing

We welcome contributions! If you find a bug or want to add a feature, please open an issue or submit a pull request.

## License

MIT
