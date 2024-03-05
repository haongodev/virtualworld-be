import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { exec } from 'child_process';

export async function GET(request) {
    const secret = request.nextUrl.searchParams.get('secret')
    const path = request.nextUrl.searchParams.get('path');
    const type = request.nextUrl.searchParams.get('type');
    const prod = process.env.NODE_ENV === 'production';
    const nodeId = process.env.NODE_ID;
    if (secret !== process.env.MY_SECRET_TOKEN) {
        return NextResponse.json({
            now: Date.now(),
            message: 'Invalid Token',
        })
    }
    if (path && type) {
        revalidatePath(path,type);
        if(prod){
            exec('pm2 reload '+nodeId, (error, stdout, stderr) => {
                if (error) {
                    return NextResponse.json({
                        now: Date.now(),
                        message: error,
                    })
                }
                // console.log(`stdout: ${stdout}`);
                // console.error(`stderr: ${stderr}`);
                return NextResponse.json({ revalidated: true, now: Date.now() })
            });
        }else{
            return NextResponse.json({ revalidated: true, now: Date.now() })
        }
    }
    return NextResponse.json({
        now: Date.now(),
        message: 'Missing path to revalidate',
    })
}