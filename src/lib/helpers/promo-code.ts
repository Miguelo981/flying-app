import { PROMO_CODES } from '../constants'
import { Boardtype } from '../models/hotel'

/**
 * 
 * @param code promotion code
 * @param boardType hotel board type
 * @returns returns the board type with the applied discount
 * @description
 * This function applies a discount properties to the board type
 */
export function applyCode(code: string, boardType: Boardtype): Boardtype {
    switch (code) {
        case PROMO_CODES[0]:
            return {
                ...boardType,
                discount: 10,
                show: boardType.boardtype === 'TI',
            }
        case PROMO_CODES[1]:
            return {
                ...boardType,
                discount: 15,
                show: true,
                btnColor: 'red',
            }
        default:
            return boardType
    }
}
