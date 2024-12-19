import { Card } from "@/app/Constants/ProjectConstants/card";
import { ProjectConstants } from "@/app/Constants/ProjectConstants/ProjectConstants";


export async function getCardById(id: string): Promise<Card | null> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return ProjectConstants.find(card => card.id === id) || null;
}

export async function getAllCards(): Promise<Card[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return ProjectConstants;
} 