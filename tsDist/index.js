import { usersInfoArray } from "./usersinfo";
import { UsersArray } from "./users";
function getUsersJobPositions(usersArray) {
    const newUserArray = [];
    if (Array.isArray(usersArray)) {
        usersArray.forEach((elUser) => {
            const userInfo = usersInfoArray.find(el => el.userid === elUser.userid);
            if (userInfo) {
                const newUserObject = {
                    name: userInfo.name,
                    position: userInfo.organization.position,
                    age: userInfo.age,
                    gender: 'man'
                };
                newUserArray.push(newUserObject);
            }
        });
    }
    return newUserArray;
}
const newUserArray = getUsersJobPositions(UsersArray);
console.log('newUserArray', newUserArray);
//# sourceMappingURL=index.js.map