import { GetText } from '@/pages/api/lang';

export default function Verfie() {
    return (
        <div className="w-[100%] h-[12.9%]  flex items-center justify-center">
            <div className="w-[80.69%] h-[100%] flex items-end justify-first">
                <h1 className="font-sora font-semibold text-[12px] leading-[15px] ">{GetText('VERIFY_CODE')}</h1>
            </div>
        </div>
    );
}