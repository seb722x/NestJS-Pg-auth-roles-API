import * as bcrypt from 'bcrypt';

interface SeedRoles {
    name: string;
       
}


interface SeedUser {
    email:    string;
    fullName: string;
    password: string;
    roles:     string[];
    phone:    string;
}


interface SeedData {
    users: SeedUser[];
    roles: SeedRoles[];
}


export const initialData: SeedData = {

    users: [
        {
            email: 'test1@gmail.com',
            fullName: 'Test One',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['admin'],
            phone:"1234789"

        },
        {
            email: 'test2@gmail.com',
            fullName: 'Test Two',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['user'],
            phone: "123467999988"
        }
    ],

    roles: [
        
        {
            name: "user",
           
           
        },
        {
            name: "admin",
            
        },
        {
            name: "customer",
            
          
        },
        {
            name: "seller",
            
           
        },
    ]
}