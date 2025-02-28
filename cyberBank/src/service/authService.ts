import { Action } from 'routing-controllers';


export async function Authorized (action: Action) {
    console.log(`get auth param from ${action.request}`);
    console.log("returns true if authorized, esle false");
    
    return true;
  }