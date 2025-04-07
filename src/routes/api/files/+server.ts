import { json } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'

export async function GET() {
    const { data, error } = await supabase
        .from('pack-files')
        .select('*')

    if (error) {
        console.error('Errore durante il recupero dei file:', error)
        return json({ error: 'Errore durante il recupero dei file' }, { status: 500 })
    }

    return json(data)
}