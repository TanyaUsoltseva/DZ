import {getTours} from "@rest/tours";
import './assets/styles/main.scss';
import {images} from "@services/img/img";
// @ts-ignore
import {ITour, ITours} from "./models/tours";
import {getTourTemplate} from "./templates/tours";
import {openModal} from "@services/modal/modalService";
import {initFooterTitle, initHeaderTitle} from "@services/general/general";

export let  toursDataArray: ITour[] = [];
const imagesStore = images; // ссылка на изображения нужна чтобы webpack формировал изображения в папке dist



initHeaderTitle('Туры', 'h1');
initFooterTitle('Туры по всему миру', 'h2');
// init data
const tourData: Promise<ITours[]> = getTours();

tourData.then((data: ITour[]  ): void => {
  console.log('call ')
  toursDataArray = data;
  initToursDivElements(data);
});


// init app

/*  - перенести все методы ниже в раздел services (сюда импортировать и вызывать)
-   создать метод initApp который будет здесь вызываться, в теле метода добавить эти имортированные методы
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы чтобы не было ошибок
*/
function initToursDivElements(data: ITour[]) : void {

  if (Array.isArray(data)) {
    const rootElement: Element = document.querySelector('.main-app');
    const tourWrap :HTMLElement = document.createElement('div');

    tourWrap.classList.add('tour-wrap');

    // init click for modal
    initTourElemListener(tourWrap);

    let rootElementData = '';
    data.forEach((el: ITour, i: number): void => {
      rootElementData += getTourTemplate(el, i);
    });

    tourWrap.innerHTML = rootElementData;
    rootElement.appendChild(tourWrap) ;
  }
}


function initTourElemListener(tourWrap: HTMLElement): void {
  tourWrap.addEventListener('click', (ev) => {
    const targetItem = <HTMLElement>ev.target;
    const parentItem = <HTMLElement>targetItem?.parentNode;
    let realTarget: undefined | HTMLElement;

    if (targetItem.hasAttribute('data-tour-item-index')) {
      realTarget = targetItem;
    } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
      realTarget = parentItem;
    }

    if (realTarget) {
      const dataIndex = realTarget.getAttribute('data-tour-item-index');
      openModal('order', Number(dataIndex));
    }
  });
}

