import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import prisma from '$lib/prisma';

export function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    });
}

export async function POST({ request }) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;
        const fileName = `${Date.now()}_${file.name}`;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const { error: uploadError } = await supabase.storage
            .from('pack-files')
            .upload(fileName, buffer, {
                contentType: file.type
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return new Response(JSON.stringify({ error: 'Upload failed' }), {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*', // oppure il tuo dominio esplicitamente
                    'Access-Control-Allow-Headers': '*'
                }
            });
        }

        const { data: publicData } = supabase.storage
            .from('pack-files')
            .getPublicUrl(fileName);

        const publicUrl = publicData?.publicUrl ?? '';

        const newFile = await prisma.packFile.create({
            data: {
                title: data.get('title') as string,
                description: data.get('description') as string,
                category: data.get('category') as string,
                language: data.get('language') as string,
                provider: data.get('provider') as string,
                roles: data.getAll('roles') as string[],
                fileUrl: publicUrl
            }
        });

        return new Response(JSON.stringify({ success: true, file: newFile }), {
            status: 201,
            headers: {
                'Access-Control-Allow-Origin': '*', // oppure "https://pack-file-viewer.onrender.com"
                'Access-Control-Allow-Headers': '*'
            }
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return new Response(JSON.stringify({ error: 'Unexpected error' }), {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        });
    }
}

