import {IUser} from "./interfaces/user";
import {IUserJobPositions} from "./interfaces/usersinfo";
import {usersInfoArray} from "./usersinfo";
import {UsersArray} from "./users";

function getUsersJobPositions(usersArray: IUser[]): IUserJobPositions[] {
    const newUserArray: IUserJobPositions[] = [];

    if (Array.isArray(usersArray)) {
        usersArray.forEach((elUser:IUser) => {
            const  userInfo = usersInfoArray.find(el => el.userid === elUser.userid);
            if (userInfo) {
                const newUserObject: IUserJobPositions = {
                    name: userInfo.name,
                    position: userInfo.organization.position,
                    age: userInfo.age,
                    gender: elUser.gender,
                }
                newUserArray.push(newUserObject);
            }
        })
    }
    return newUserArray;
}

const newUserArray = getUsersJobPositions(UsersArray);
console.log('newUserArray', newUserArray)