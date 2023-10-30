import { PROMO_CODES } from '@/lib/constants'
import { usePromoCodeStore } from '@/lib/stores/usePromoCodeStore'
import { useState, ChangeEvent } from 'react'
import { toast } from 'sonner'

export default function PromoForm() {
    const { setCode, clearCode, code } = usePromoCodeStore()
    const [promoCode, setPromoCode] = useState<string>(code)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (!PROMO_CODES.includes(value)) {
            clearCode();
        }

        setPromoCode(value)
    }

    const handleSendPromoCodeClick = () => {
        if (!PROMO_CODES.includes(promoCode)) {
            toast.error('El código promocional no es válido')
            return;
        }

        setCode(promoCode)
        toast.message('Código promocional aplicado')
    }

    return (
        <div>
            PROMO CODE: {code }
            <header className='p-5 border border-gray-200'>
                <span className="uppercase">Código promocional</span>
            </header>
            <section className="p-5 flex gap-2 border-x border-b border-gray-200">
                <input type="text" className='p-1 border border-gray-300 w-full focus:outline-none' value={promoCode} onChange={handleChange} />
                <button onClick={handleSendPromoCodeClick} className="px-4 border-blue-800 border text-blue-800">Enviar</button>
            </section>
        </div>
    )
}