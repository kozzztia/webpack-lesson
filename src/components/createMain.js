import cat from "../assets/Cat03.jpg";
import {img , title} from "./style.module.css";

export function createMain() {
    const element = document.createElement('main');
    const text = document.createElement('h2');
    const image = document.createElement('img');
    text.innerText = "hello";
    text.classList.add(title)
    image.src = cat;
    image.alt = "cat",
    image.classList.add(img)


    element.append(text , image);
    return element
}