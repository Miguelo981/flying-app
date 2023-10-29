import type { PropsWithChildren } from 'react';
import Header from './Header';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="app">
            <Header />
            <main className="">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}