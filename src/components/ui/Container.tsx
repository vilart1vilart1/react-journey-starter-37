
import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container = ({ 
  children, 
  className, 
  as: Component = "div" 
}: ContainerProps) => {
  return (
    <Component 
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", 
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;
