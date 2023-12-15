export interface ITour {
  name: string,
  description: string,
  tourOperator: string,
  price: string,
  img: string,
  id: string,
  type: string,
  date: string,
  _id: string,
}

export type TourType = 'Одиночный' | 'Групповой';
export interface ITourTypeSelect {
  label?: string,
  value?: string,
  date?: string
}

export interface INearestTour extends ITour {
  locationId: string
}

export interface ICustomTicketData extends INearestTour {
 region: ITourLocation
}

export interface ITourLocation {
  name: string,
  id: string,
}

export interface IOrder {
  age: string,
  birthDay: string,
  cardNumber: string,
  tourId: string,
  userId: string | null,
  _id?: string
}
