import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, of, switchMap, timer } from 'rxjs';
import { storageService } from './storage.service';
import { Trade } from '../models/bitcoin.moderl';

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {

    TRADE_VOLUME_KEY = 'tradeVolume'

    constructor(private http: HttpClient) { }

    getRateStream(coins: number): Observable<string> {
        return timer(0, 1000 * 60 * 5).pipe(
            switchMap(idx => this.getRate(coins))
        )
    }

    getRate(coins: number): Observable<string> {
        return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    }

    getTradeVolume(): Observable<Trade[]> {
        const data = storageService.load(this.TRADE_VOLUME_KEY)
        // console.log('data service', data);

        if (data) return of(data)
        return this.http.get<{ values: [{ x, y }] }>(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
            .pipe(map(res => {
                const vals = res.values.map(item => ({
                    name: new Date(item.x * 1000).toLocaleDateString("en-US"),
                    value: item.y
                }))
                storageService.store(this.TRADE_VOLUME_KEY, vals)
                return vals
            }))
    }

}

