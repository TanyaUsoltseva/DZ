




/* - пример использования методов с generic type <T>
  -  запрос на получение информации о туре
 */
import {ITour} from "../../models/tours";

export function getTicketById<T>(id: string): Promise<ITour[]> {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/ticket').then((response) => response.json())
        .then((data: ITour[]) => {
            return data;
        });
}


// запрос на на отправку данных - пока не используется

export function postTicketData(postData): Promise<{success: boolean}> {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/ticket').then((response) => response.json())
        .then((data: {success: boolean}) => {
            return data;
        });
}

