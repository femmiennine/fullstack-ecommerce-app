import { css } from 'styled-components'

export const mobile = (props: string | number | any) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `
}
