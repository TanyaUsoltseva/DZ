export class Modal {
    private readonly id: string;

    public static modals: any[] = [];

    constructor(id = null) {
         const findModal = Modal.modals.find(x => x.id === id);
         if (findModal) {
             Modal.removeById(this.id);
         }

        Modal.modals.push(this);
        console.log("Modal.modals", Modal.modals);
        // Modal.modals [ Modal {} ]
        this.id = id ||(Math.random() + Modal.modals.length);
    }

    public open(template: string): void {

        const divWrap: HTMLDivElement = document.createElement("div");
        divWrap.innerHTML = template;
        divWrap.id = this.id;
        divWrap.setAttribute('madal-id', this.id)
        divWrap.classList.add("modal-element");
        document.body.appendChild(divWrap)
    }

    public remove(): void {
        const modalEl: HTMLElement = document.getElementById(this.id);
        modalEl.parentNode.removeChild(modalEl);
    }

    public removeModal(): void {
        Modal.removeById();
    }

    public static removeById(id: string = null): void {
        let modalId = id;

        const findEl = Modal.modals.find(x => x.id === modalId);
        if (findEl) {
            findEl.remove();
            Modal.modals = Modal.modals.filter((el) => el.id !== modalId);
        } else {
            if (Array.isArray(Modal.modals)) {
                const lastEl = Modal.modals.pop();
                if (lastEl) {
                    lastEl.remove();
                }
            }
        }
    }
    public static removeAll() {
        if (Array.isArray(Modal.modals)) {
            Modal.modals.forEach((el) => {
                Modal.removeById(el.id);
            });
        }
    }
}

const modal = new Modal();