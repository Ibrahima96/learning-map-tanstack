import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const toStudentDTO = (s: any) => ({
  id: s._id.toString(),
  name: s.name,
  age: s.age,
  classe: s.classe,
  createdAt: s.createdAt?.toISOString(),
});

// Dans votre handler :
// return { students: students.map(toStudentDTO) };