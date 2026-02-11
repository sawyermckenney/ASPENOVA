import { Toaster as Sonner, type ToasterProps } from "sonner@2.0.3";

const Toaster = (props: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#000000",
          "--normal-border": "rgba(0,0,0,0.1)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
