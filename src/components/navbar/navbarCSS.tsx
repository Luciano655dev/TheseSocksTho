import styled from "styled-components"
import { Link } from "react-router-dom"

export const NavbarContainer = styled.div`
  top: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 10vh;
  overflow: hidden;
  background: none;
  background-color: #f5f5f5;
  transition: opacity 0.3s ease-in, visibility 0.5s ease-in;
  z-index: 10;

  img {
    margin: 0;
    margin-left: 2em;
    width: 10em;
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    img {
      margin-left: 0.5em;
      padding-top: 1em;
    }
  }
`

export const NavbarLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  margin-right: 1em;

  border: 1px solid #e1e1e1;
  border-radius: 999px;
  color: #000;

  font-size: 1.3em;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    filter: brightness(0.98);
  }

  .primary {
    background: #111;
    color: #fff;
    border-color: #111;
  }
`

export const HamburguerMenuLink = styled(Link)`
  font-size: 2em;
  margin: 0;
  margin-bottom: 10vw;
  text-decoration: none;
  color: #000;

  &:active {
    color: #000;
  }
`

export const HamburguerMenu = styled.div`
  position: fixed;
  top: 5em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 91vh;
  background-color: #f5f5f5;

  @media (min-width: 800px) {
    display: none;
  }
`

export const HamburguerMenuIcon = styled.input`
  display: none;
  --s: 30px; /* Tamanho do ícone */
  --c: #000; /* Cor do ícone */
  --line-height: 2px; /* Altura das linhas */

  @media (max-width: 800px) {
    display: block;
  }

  height: var(--s);
  aspect-ratio: 1;
  border-inline: calc(var(--s) / 2) solid #0000;
  box-sizing: content-box;
  --_g1: linear-gradient(var(--c) 100%, #0000 0) no-repeat content-box;
  --_g2: linear-gradient(var(--c) 100%, #0000 0) no-repeat content-box;
  background: var(--_g1) left calc(var(--s) / 10 + var(--_p, 0px)) top,
    var(--_g1) right calc(var(--s) / 10 + var(--_p, 0px)) top,
    var(--_g2) left calc(var(--s) / 10 + var(--_p, 0px)) bottom,
    var(--_g2) right calc(var(--s) / 10 + var(--_p, 0px)) bottom;
  background-size: 100% var(--line-height);
  position: relative;
  clip-path: inset(0 25%);
  cursor: pointer;
  transition: background-position 0.5s var(--_s, 0.3s),
    clip-path 0s var(--_s, 0.6s);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 45% 0;
    height: var(--line-height);
    background: var(--c);
    transition: transform 0.3s calc(0.3s - var(--_s, 0.3s));
  }

  &:checked {
    clip-path: inset(0);
    --_p: calc(-2 * var(--s));
    --_s: 0s;
  }

  &:checked::before {
    transform: rotate(45deg);
  }

  &:checked::after {
    transform: rotate(-45deg);
  }

  &:focus-visible {
    clip-path: none;
    border: none;
    outline: 2px solid var(--c);
    outline-offset: 5px;
  }
`
