'use client'
import { useEffect } from 'react'

export function ClientSideHashFix() {
 useEffect(() => {
  if (window.location.hash === "#_=_") {
   history.replaceState(null, "", window.location.pathname + window.location.search);
  }
 }, []);

 return null; // No renderiza nada
}