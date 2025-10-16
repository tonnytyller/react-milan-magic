import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, profiles(full_name), user_addresses(*)')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load orders');
    } else {
      setOrders(data || []);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Failed to update order status');
    } else {
      toast.success('Order status updated');
      fetchOrders();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payment_pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'processing': return 'bg-purple-500';
      case 'shipped': return 'bg-indigo-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #{order.order_number}</h3>
                <p className="text-sm text-muted-foreground">{order.profiles?.full_name}</p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status.replace('_', ' ')}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-semibold">
                  KSh {Number(order.total_amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-semibold">{order.payment_method}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {order.status === 'payment_pending' && (
                <Button size="sm" onClick={() => updateOrderStatus(order.id, 'confirmed')}>
                  Confirm Payment
                </Button>
              )}
              {order.status === 'confirmed' && (
                <Button size="sm" onClick={() => updateOrderStatus(order.id, 'processing')}>
                  Start Processing
                </Button>
              )}
              {order.status === 'processing' && (
                <Button size="sm" onClick={() => updateOrderStatus(order.id, 'shipped')}>
                  Mark as Shipped
                </Button>
              )}
              {order.status === 'shipped' && (
                <Button size="sm" onClick={() => updateOrderStatus(order.id, 'delivered')}>
                  Mark as Delivered
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
