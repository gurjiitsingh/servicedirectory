export type sessionT ={
    user:{role:string};
  }

  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    }
  }

type userType = {
  email:string;
  id:string;
  name:string;
  role:string;
}
type sessionType ={
  expires:string;
  user:userType;
}
  