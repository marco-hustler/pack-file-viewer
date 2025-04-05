import { json } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'
import prisma from '$lib/prisma'

export async function POST({ request }) {
    try {
        const data = await request.formData()

        const file = data.get('file') as File
        const fileName = `${Date.now()}_${file.name}`

        // Caricamento su Supabase Storage
        const { error: uploadError } = await supabase
            .storage
            .from('files')
            .upload(fileName, file)

        if (uploadError) {
            return json({ error: 'Errore upload file', details: uploadError }, { status: 500 })
        }

        // Ottieni URL pubblico del file
        const { data: publicData } = supabase
            .storage
            .from('files')
            .getPublicUrl(fileName)

        const publicUrl = publicData?.publicUrl ?? ''

        // Salvataggio nel DB
        const newFile = await prisma.packFile.create({
            data: {
                title: data.get('title') as string,
                description: data.get('description') as string,
                category: data.get('category') as string,
                language: data.get('language') as string,
                provider: data.get('provider') as string,
                roles: data.getAll('roles') as string[], // supporto per selezione multipla
                fileUrl: publicUrl
            }
        })

        return json({ success: true, file: newFile }, { status: 201 })

    } catch (err) {
        return json({ error: 'Errore imprevisto', details: err }, { status: 500 })
    }
}