
import { supabase } from '@/lib/auth';
import { toast } from 'sonner';

export interface UserImage {
  id: string;
  user_id: string;
  url: string;
  prompt: string;
  created_at: string;
}

// Save an image to the user's collection
export const saveUserImage = async (imageUrl: string, prompt: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    
    console.log('Intentando guardar imagen para el usuario:', user.id);

    const { data, error } = await supabase
      .from('user_images')
      .insert([
        {
          user_id: user.id,
          url: imageUrl,
          prompt: prompt
        }
      ])
      .select();

    if (error) {
      console.error('Error en Supabase:', error);
      
      if (error.code === '42501') {
        throw new Error('Error de permisos: verifica que las políticas RLS estén correctamente configuradas');
      }
      
      throw error;
    }
    
    toast('Imagen guardada', {
      description: 'La imagen se ha guardado en tu colección'
    });
    
    return data;
  } catch (error: any) {
    console.error('Error saving image:', error);
    toast('Error', {
      description: error.message || 'No se pudo guardar la imagen'
    });
    throw error;
  }
};

// Get all images for the current user
export const getUserImages = async (): Promise<UserImage[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }
    
    console.log('Obteniendo imágenes para el usuario:', user.id);

    const { data, error } = await supabase
      .from('user_images')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error en Supabase al obtener imágenes:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching user images:', error);
    return [];
  }
};

// Delete an image from the user's collection
export const deleteUserImage = async (imageId: string) => {
  try {
    const { error } = await supabase
      .from('user_images')
      .delete()
      .eq('id', imageId);

    if (error) {
      console.error('Error en Supabase al eliminar la imagen:', error);
      throw error;
    }
    
    toast('Imagen eliminada', {
      description: 'La imagen se ha eliminado de tu colección'
    });
    
    return true;
  } catch (error: any) {
    console.error('Error deleting image:', error);
    toast('Error', {
      description: error.message || 'No se pudo eliminar la imagen'
    });
    throw error;
  }
};
