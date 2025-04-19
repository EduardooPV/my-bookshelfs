import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';

interface ToggleEyeProps {
  password: string;
  setPassword: (arg0: string) => void;
}

export const ToggleEye = ({ password, setPassword }: ToggleEyeProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="**********"
        className="pl-10"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
        className="absolute right-2 top-2 rounded-md p-1"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
};
