
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function DELETE({ params }) {
    const { id } = params;

    if (!id) {
        return json({ error: 'ID mancante' }, { status: 400 });
    }

    const { error } = await supabase.from('pack-files').delete().eq('id', id);

    if (error) {
        console.error('Errore durante la cancellazione:', error);
        return json({ error: 'Errore durante la cancellazione del file' }, { status: 500 });
    }

    return json({ success: true });
}