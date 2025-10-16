import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export const AdminPayments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    const { data, error } = await supabase
      .from('payment_transactions')
      .select('*, orders(order_number, total_amount, profiles(full_name))')
      .eq('verified', false)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load payments');
    } else {
      setPayments(data || []);
    }
  };

  const verifyPayment = async (paymentId: string, orderId: string) => {
    const { error: paymentError } = await supabase
      .from('payment_transactions')
      .update({
        verified: true,
        verified_by: user?.id,
        verified_at: new Date().toISOString(),
      })
      .eq('id', paymentId);

    if (paymentError) {
      toast.error('Failed to verify payment');
      return;
    }

    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'confirmed' })
      .eq('id', orderId);

    if (orderError) {
      toast.error('Failed to update order status');
    } else {
      toast.success('Payment verified successfully');
      fetchPendingPayments();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pending Payments</h2>

      <div className="space-y-4">
        {payments.map((payment) => (
          <Card key={payment.id} className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-semibold">{payment.orders?.order_number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-semibold">{payment.orders?.profiles?.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">M-Pesa Code</p>
                <p className="font-semibold">{payment.mpesa_code}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-semibold">
                  KSh {Number(payment.amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <Button onClick={() => verifyPayment(payment.id, payment.order_id)}>
              Verify Payment
            </Button>
          </Card>
        ))}

        {payments.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No pending payments</p>
        )}
      </div>
    </div>
  );
};
